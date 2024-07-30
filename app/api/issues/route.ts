import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";
import createIssueSchema from "@/app/validationSchema";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import OptionAuth from "@/app/auth/optionAuth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(OptionAuth);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
