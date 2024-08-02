import OptionAuth from "@/app/auth/optionAuth";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/clients";

import NextAuth, { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: Props) {
  const session = await getServerSession(OptionAuth);
  if (!session) return NextResponse.json({}, { status: 400 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedUserId, title, description } = body;
  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });

    if (!user)
      return (
        NextResponse.json({ error: "User does not exist" }), { status: 400 }
      );
  }
  const issue = await prisma.issue.findUnique({
    where: { Id: params.id },
  });

  if (!issue)
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { Id: issue.Id },
    data: { title, description, assignedUserId },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(OptionAuth);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { Id: params.id },
  });

  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 400 });
  await prisma.issue.delete({
    where: { Id: issue.Id },
  });

  return NextResponse.json({}, { status: 201 });
}
