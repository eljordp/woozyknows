import { notFound } from "next/navigation";
import { getThread } from "@/lib/messages";
import { getVendor } from "@/lib/data";
import ThreadView from "./ThreadView";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ vendorSlug: string }>;
}) {
  const { vendorSlug } = await params;
  const thread = getThread(vendorSlug);
  const vendor = getVendor(vendorSlug);
  if (!thread || !vendor) return notFound();

  return <ThreadView vendor={vendor} messages={thread.messages} />;
}
