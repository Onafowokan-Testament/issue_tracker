import createIssueSchema from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: Props) {
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
