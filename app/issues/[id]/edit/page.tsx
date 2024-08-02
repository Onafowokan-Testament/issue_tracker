import prisma from "@/prisma/clients";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
interface Prop {
  params: { id: string };
}
const EditForm = async ({ params }: Prop) => {
  const issue = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue}></IssueForm>;
};

export default EditForm;
