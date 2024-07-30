import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";
import createIssueSchema from "@/app/validationSchema";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/components/AuthOptions";

export async function POST(request: NextRequest) {
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

export async function PUT(request: NextRequest, { Id }: { Id: number }) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error?.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { Id: Id },
  });

  if (!issue) notFound();

  const updatedIssue = await prisma.issue.update({
    where: { Id: Id },
    data: { title: body.title, description: body.description },
  });
}
