import OptionAuth from "@/app/auth/optionAuth";
import createIssueSchema from "@/app/validationSchema";
import prisma from "@/prisma/client";

import NextAuth, { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: Props) {
  const session = await getServerSession(OptionAuth);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error?.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "invalid issue" }, { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: { Id: issue.Id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(OptionAuth);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 400 });
  await prisma.issue.delete({
    where: { Id: issue.Id },
  });

  return NextResponse.json({}, { status: 201 });
}
