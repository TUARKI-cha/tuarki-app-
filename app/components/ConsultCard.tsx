type ConsultCardProps = {
    title: string;
    status: string;
    time: string;
  };
  
  export default function ConsultCard({
    title,
    status,
    time,
  }: ConsultCardProps) {
    return (
      <div className="bg-white rounded-[30px] p-7 shadow-sm border border-[#ECECEC]">
  
        <div className="flex items-start justify-between mb-6">
  
          <div>
  
            <h3 className="text-2xl font-bold text-[#0D3B2E]">
              {title}
            </h3>
  
            <p className="text-[#4B6358] mt-2">
              {time}
            </p>
  
          </div>
  
          <div className="bg-[#E6F4EC] text-[#1E7A5A] px-4 py-2 rounded-full text-sm font-semibold">
            {status}
          </div>
  
        </div>
  
        <button className="mt-4 w-full bg-[#0D3B2E] text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300">
          Ver consulta
        </button>
  
      </div>
    );
  }