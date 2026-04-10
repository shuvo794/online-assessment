import { OnlineTestsEmptyState } from "@/components/online-tests-empty-state";
import { OnlineTestsToolbar } from "@/components/online-tests-toolbar";

/** Full page: toolbar + empty card (route `/online-tests/empty`) */
export function OnlineTestsEmptyView() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
      <OnlineTestsToolbar />
      <OnlineTestsEmptyState />
    </div>
  );
}
