import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const consultations =
      await prisma.consultation.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(consultations);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error loading consultations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const consultation =
      await prisma.consultation.create({
        data: {
          title: body.title,
          description: body.description,
          category: body.category,
          specialistName: body.specialistName,
        },
      });

    return NextResponse.json(consultation);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error creating consultation" },
      { status: 500 }
    );
  }
}