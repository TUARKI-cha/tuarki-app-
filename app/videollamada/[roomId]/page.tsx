"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import io from "socket.io-client";
import Peer from "simple-peer";
import { supabase } from "@/lib/supabase";

import {
  MessageCircle,
  Paperclip,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  PhoneOff,
  ShieldCheck,
  Monitor,
} from "lucide-react";

export default function VideoCallPage() {
  /* ROUTER */
  const router = useRouter();
  const params = useParams();
  const roomId = params.roomId as string;
  const consultationId = roomId;

  /* REFS */
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const socketRef = useRef<any>(null);
  const peerRef = useRef<any>(null);

  /* STATES */
  const [connectionStatus, setConnectionStatus] =
  useState("Conectando...");
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [callEnded, setCallEnded] = useState(false);

  const [consultation, setConsultation] =
  useState<any>(null);

  const [professional, setProfessional] =
  useState<any>(null);

  /* TIMER FORMAT */
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;

  /* SOCKET + MEDIA */
  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    async function startMedia() {
      try {
        setConnectionStatus("Solicitando cámara...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          setConnectionStatus("Esperando especialista...");
        }

        socketRef.current.emit("join-room", roomId);
        setConnectionStatus("Especialista conectado");
        socketRef.current.on("user-connected", () => {
          const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
          });

          peer.on("signal", (data) => {
            socketRef.current.emit("offer", {
              roomId,
              offer: data,
            });
          });
          socketRef.current.on(
            "user-disconnected",
            () => {
          
              setConnectionStatus(
                "Especialista desconectado"
              );
          
            }
          );
          peer.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              setConnectionStatus("Conectado");
            }
          });
          socketRef.current.on(
            "user-disconnected",
            () => {
          
              setConnectionStatus(
                "Especialista desconectado"
              );
          
            }
          );
          peerRef.current = peer;
        });

        socketRef.current.on("offer", (offer: any) => {
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
          });
          socketRef.current.on(
            "user-disconnected",
            () => {
          
              setConnectionStatus(
                "Especialista desconectado"
              );
          
            }
          );
          peer.on("signal", (data) => {
            socketRef.current.emit("answer", {
              roomId,
              answer: data,
            });
          });
          socketRef.current.on(
            "user-disconnected",
            () => {
          
              setConnectionStatus(
                "Especialista desconectado"
              );
          
            }
          );
          peer.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              setConnectionStatus("Conectado");
            }
          });
          socketRef.current.on(
            "user-disconnected",
            () => {
          
              setConnectionStatus(
                "Especialista desconectado"
              );
          
            }
          );
          peer.signal(offer);

          peerRef.current = peer;
        });

        socketRef.current.on("answer", (answer: any) => {
          peerRef.current?.signal(answer);
        });

        socketRef.current.on("receive-message", (message: any) => {
          setMessages((prev) => [...prev, message]);
        });
      } catch (error) {
        console.log(error);
      }
    }

    startMedia();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  /* TIMER */
  useEffect(() => {
    if (callEnded) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          endCall();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [callEnded]);

const loadConsultation = async () => {
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("id", consultationId)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  setConsultation(data);

  if (data?.assigned_professional_id) {
    const { data: professionalData } =
      await supabase
        .from("professionals")
        .select("*")
        .eq(
          "id",
          data.assigned_professional_id
        )
        .maybeSingle();

    setProfessional(professionalData);
  }
};

useEffect(() => {
  if (consultationId) {
    loadConsultation();
  }
}, [consultationId]);

  /* SEND MESSAGE */
  function sendMessage() {
    if (!messageInput.trim()) return;

    const message = {
      sender: "Tú",
      text: messageInput,
    };

    socketRef.current?.emit("send-message", message);

    setMessages((prev) => [...prev, message]);
    setMessageInput("");
  }

  /* TOGGLE MICROPHONE */
  function toggleMicrophone() {
    if (!localVideoRef.current?.srcObject) return;

    const stream = localVideoRef.current.srcObject as MediaStream;

    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setMicOn(track.enabled);
    });
  }

  /* TOGGLE CAMERA */
  function toggleCamera() {
    if (!localVideoRef.current?.srcObject) return;

    const stream = localVideoRef.current.srcObject as MediaStream;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setCameraOn(track.enabled);
    });
  }

  /* SHARE SCREEN */
  async function shareScreen() {
    try {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

      const screenTrack = screenStream.getVideoTracks()[0];

      const localStream =
        localVideoRef.current?.srcObject as MediaStream;

      const oldVideoTrack =
        localStream.getVideoTracks()[0];

      if (peerRef.current && oldVideoTrack) {
        peerRef.current.replaceTrack(
          oldVideoTrack,
          screenTrack,
          localStream
        );
      }

      localStream.removeTrack(oldVideoTrack);
      localStream.addTrack(screenTrack);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      screenTrack.onended = async () => {
        const cameraStream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        const cameraTrack = cameraStream.getVideoTracks()[0];

        if (peerRef.current) {
          peerRef.current.replaceTrack(
            screenTrack,
            cameraTrack,
            localStream
          );
        }

        localStream.removeTrack(screenTrack);
        localStream.addTrack(cameraTrack);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  /* FILE SELECT */
  function handleFileSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileMessage = {
      sender: "Tú",
      text: `📎 Archivo enviado: ${file.name}`,
    };

    socketRef.current?.emit("send-message", fileMessage);

    setMessages((prev) => [...prev, fileMessage]);
  }

  /* END CALL */
  async function endCall() {

    setCallEnded(true);
  
    const localStream =
      localVideoRef.current?.srcObject as MediaStream;
  
    localStream
      ?.getTracks()
      .forEach((track) => track.stop());
  
    const remoteStream =
      remoteVideoRef.current?.srcObject as MediaStream;
  
    remoteStream
      ?.getTracks()
      .forEach((track) => track.stop());
  
    peerRef.current?.destroy();
  
    socketRef.current?.disconnect();
  
    await supabase
    .from("consultations")
    .update({
      status: "completed",
      duration: 15 * 60 - secondsLeft,
    })
    .eq("id", consultationId);
  
  router.push(`/finalizar-consulta/${consultationId}`);
  
  }

  return (
    <main className="min-h-screen bg-[#F5F5F3] px-6 py-5">
      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="max-w-[1850px] mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          {/* HEADER LEFT */}
          <div className="flex items-center gap-5">
            {/* LOGO */}
            <div className="w-[140px] h-[60px] flex items-center justify-center bg-gradient-to-r from-[#0D3B2E] to-[#1E7A5A] rounded-2xl text-white font-bold text-2xl shadow-lg">
              TuArki
            </div>

            {/* SPECIALIST INFO */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
                  alt="Arquitecta"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[48px] leading-none font-bold text-[#111]">
                    {professional?.name || "Especialista asignado"}
                  </h1>

                  <span className="text-[#57B33E] text-xl">
                    ✔
                  </span>
                </div>

                <p className="text-[#6B7280] text-lg mt-1">
                  {professional?.specialty || "Especialista en construcción"}
                </p>

                <div className="flex items-center gap-5 mt-2 text-[15px]">
                  <span className="text-[#F5B301] font-medium">
                    ⭐ {professional?.rating || 5}
                  </span>

                  <span className="text-[#57B33E] font-medium">
                    ● En línea
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HEADER CENTER */}
          <div className="bg-white border border-[#E8ECE8] rounded-[32px] px-10 py-5 shadow-sm">
            <p className="text-[#6B7280] text-sm">
              Tiempo restante
            </p>

            <h2 className="text-[68px] font-bold text-[#57B33E] leading-none">
              {formattedTime}
            </h2>

            <p className="text-[#6B7280] text-sm mt-1">
              de 15:00 min
            </p>
          </div>

          {/* HEADER RIGHT */}
          <div className="flex items-center gap-10">
            <div>
              <p className="text-sm text-[#6B7280]">
                Conexión
              </p>

              <p className="text-[#57B33E] font-semibold text-lg">
                Excelente
              </p>
            </div>

            <button
              onClick={endCall}
              className="bg-white border border-[#E6E6E6] hover:bg-[#FAFAFA] transition-all px-8 py-4 rounded-full font-semibold text-[#E53935] shadow-sm"
            >
              Abandonar llamada
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-[1fr_420px] gap-6">
          {/* VIDEO AREA */}
          <div>
            <div className="relative bg-black rounded-[42px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.22)] border border-[#E9ECE9]">
              <div className="aspect-[16/9] relative bg-[#101010]">
                {/* REMOTE VIDEO */}
                {/* CONNECTION LOADER */}
{connectionStatus !== "Conectado" && (
  <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">

    <div className="w-16 h-16 border-4 border-white/20 border-t-[#57B33E] rounded-full animate-spin mb-6" />

    <h2 className="text-white text-2xl font-semibold">
      {connectionStatus}
    </h2>

    <p className="text-gray-400 mt-2">
      Preparando videollamada segura...
    </p>

  </div>
)}
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* VIDEO OVERLAY */}
                <div className="absolute inset-0 bg-black/10" />

                {/* SPECIALIST TAG */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl text-white flex items-center gap-3">
                  <span className="font-semibold">
                    {professional?.name || "Especialista"}
                  </span>

                  <span className="text-[#57B33E]">
                    🔊
                  </span>
                </div>

                {/* LOCAL VIDEO */}
                <div className="absolute top-7 right-7 w-[320px] h-[190px] rounded-[30px] overflow-hidden border border-white/20 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-white text-sm font-medium">
                    Tú
                  </div>
                </div>

                {/* SECURITY */}
                <div className="absolute bottom-32 left-7 bg-black/55 backdrop-blur-2xl border border-white/10 rounded-[28px] p-5 text-white w-[310px] shadow-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#57B33E]/20 flex items-center justify-center">
                      <ShieldCheck
                        size={28}
                        strokeWidth={2.2}
                        className="text-[#7ED957]"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        Videollamada segura
                      </h3>

                      <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                        Tu llamada está cifrada de extremo a extremo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTROLS */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-2xl px-8 py-6">
                  <div className="flex items-center justify-center gap-8">
                    {/* CHAT BUTTON */}
                    <button className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-95 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                        <MessageCircle size={24} strokeWidth={2.2} />
                      </div>

                      <span className="text-sm text-white/90">
                        Chat
                      </span>
                    </button>

                    {/* FILES BUTTON */}
                    <button
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                        <Paperclip size={24} strokeWidth={2.2} />
                      </div>

                      <span className="text-sm text-white/90">
                        Archivos
                      </span>
                    </button>

                    {/* SHARE SCREEN BUTTON */}
                    <button
                      onClick={shareScreen}
                      className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                        <Monitor size={24} strokeWidth={2.2} />
                      </div>

                      <span className="text-sm text-white/90">
                        Compartir
                      </span>
                    </button>

                    {/* MICROPHONE BUTTON */}
                    <button
                      onClick={toggleMicrophone}
                      className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <div
                        className={`w-16 h-16 rounded-full transition-all flex items-center justify-center ${
                          micOn
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-red-500"
                        }`}
                      >
                        {micOn ? (
                          <Mic size={24} strokeWidth={2.2} />
                        ) : (
                          <MicOff size={24} strokeWidth={2.2} />
                        )}
                      </div>

                      <span className="text-sm text-white/90">
                        Micrófono
                      </span>
                    </button>

                    {/* CAMERA BUTTON */}
                    <button
                      onClick={toggleCamera}
                      className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <div
                        className={`w-16 h-16 rounded-full transition-all flex items-center justify-center ${
                          cameraOn
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-red-500"
                        }`}
                      >
                        {cameraOn ? (
                          <Camera size={24} strokeWidth={2.2} />
                        ) : (
                          <CameraOff size={24} strokeWidth={2.2} />
                        )}
                      </div>

                      <span className="text-sm text-white/90">
                        Cámara
                      </span>
                    </button>

                    {/* SPEAKER BUTTON */}
                    <button className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-95 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                        <Volume2 size={24} strokeWidth={2.2} />
                      </div>

                      <span className="text-sm text-white/90">
                        Altavoz
                      </span>
                    </button>

                    {/* END CALL BUTTON */}
                    <button
                      onClick={endCall}
                      className="flex flex-col items-center gap-2 text-[#FF4D4F] hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#FF4D4F] flex items-center justify-center text-white shadow-lg">
                        <PhoneOff size={30} strokeWidth={2.5} />
                      </div>

                      <span className="text-sm font-semibold">
                        Finalizar
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-5">
            {/* SUMMARY */}
            <div className="bg-white rounded-[32px] border border-[#ECECEC] p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#111111]">
                  Resumen de tu consulta
                </h3>

                <button className="text-[#57B33E] font-semibold">
                  Editar
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[#6B7280] text-sm mb-1">
                    Problema:
                  </p>

                  <p className="text-[#111111] font-medium leading-relaxed">
                  {consultation?.description || "Consulta arquitectónica"}
                  </p>
                </div>

                <div>
                  <p className="text-[#6B7280] text-sm mb-1">
                    Categoría:
                  </p>

                  <p className="text-[#111111] font-medium">
                  {consultation?.service || consultation?.category || "Construcción"}
                  </p>
                </div>

                <div>
                  <p className="text-[#6B7280] text-sm mb-1">
                    Consultado el:
                  </p>

                  <p className="text-[#111111] font-medium">
                  {consultation?.created_at
                    ? new Date(consultation.created_at).toLocaleString("es-MX")
                    : "Fecha no disponible"}
                  </p>
                </div>
              </div>
            </div>

            {/* CHAT */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[32px] border border-white/40 shadow-[0_10px_50px_rgba(0,0,0,0.08)] p-6">
              <h3 className="text-2xl font-bold mb-4 text-[#0D3B2E]">
                Chat en vivo
              </h3>

              <div className="flex flex-col gap-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-[#F3F4F6] rounded-2xl px-4 py-3"
                  >
                    <p className="font-semibold text-sm text-[#57B33E]">
                      {msg.sender}
                    </p>

                    <p className="text-sm text-[#111111] mt-1">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={messageInput}
                  onChange={(e) =>
                    setMessageInput(e.target.value)
                  }
                  placeholder="Escribe un mensaje..."
                  className="flex-1 border border-[#ECECEC] rounded-2xl px-4 py-3 outline-none"
                />

                <button
                  onClick={sendMessage}
                  className="bg-[#57B33E] hover:bg-[#4ca535] transition-all text-white px-6 rounded-2xl font-semibold"
                >
                  Enviar
                </button>
              </div>
            </div>

            {/* RECOMMENDATIONS */}
            <div className="bg-white rounded-[32px] border border-[#ECECEC] p-7 shadow-sm">
              <h3 className="text-xl font-bold text-[#111111] mb-5">
                Recomendaciones
              </h3>

              <div className="space-y-4 text-[#404040]">
                <label className="flex items-start gap-3">
                  <input type="radio" />
                  <span>Sellar junta exterior de la ventana</span>
                </label>

                <label className="flex items-start gap-3">
                  <input type="radio" />
                  <span>Impermeabilizar el marco</span>
                </label>

                <label className="flex items-start gap-3">
                  <input type="radio" />
                  <span>Revisar pendiente para escurrimiento</span>
                </label>

                <label className="flex items-start gap-3">
                  <input type="radio" />
                  <span>Aplicar sellador antihumedad</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}