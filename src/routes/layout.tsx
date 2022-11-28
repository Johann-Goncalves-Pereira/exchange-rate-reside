import { component$, Resource, useResource$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const state = useStore({
    hours: 0,
    rate: 0,
  });

  const getConversion = useResource$<number>(async ({ cleanup }) => {
    const aboutConversion = new AbortController();
    cleanup(() => aboutConversion.abort());
    const res = await fetch(
      "https://v6.exchangerate-api.com/v6/50e2b4e30e99450511074329/latest/USD",
      {
        signal: aboutConversion.signal,
      }
    );
    const data = await res.json();
    const conversion = data.conversion_rates.BRL;
    return conversion;
  });

  return (
    <>
      <main class="grid h-full place-content-center text-white">
        <div class="grid gap-1">
          <div class="flex items-end gap-1">
            <div class="grid">
              <label class="capitalize ">hours</label>
              <input
                type="number"
                class="w-56 min-w-min rounded-sm bg-slate-600 py-1 px-2 text-2xl text-white outline-none"
                onInput$={({ target }) =>
                  // @ts-ignore
                  (state.hours = (target as HTMLInputElement).value).replace(
                    /(?![0-9])./gim,
                    ""
                  )
                }
              />
            </div>
            <span class="">* $20</span>
          </div>

          <div class="flex items-end gap-1">
            <div class="grid">
              <label>Rate</label>
              <span class="w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl">
                $ {state.hours * 20}
              </span>
            </div>
            <Resource
              value={getConversion}
              onResolved={(conversion) => {
                state.rate = conversion;
                return (
                  <span>
                    * {conversion}
                    <span class="text-xs">USD</span>
                  </span>
                );
              }}
            />
          </div>

          <div class="grid">
            <label>Amount</label>
            <span class="flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl">
              R$ {state.hours * 20 * state.rate}
            </span>
          </div>
        </div>
      </main>
    </>
  );
});

export const getURL = async (url: RequestInfo | URL) => {
  return (await fetch(url)).json();
};

export const getInfoSelect = (select: {
  options: { [x: string]: { text: any } };
  selectedIndex: string | number;
}) => {
  return select.options[select.selectedIndex].text;
};
