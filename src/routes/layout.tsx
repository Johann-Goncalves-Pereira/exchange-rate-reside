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

  const fullAmount = state.hours * 20 * state.rate;

  return (
    <>
      <main class="grid h-full place-content-center text-white">
        <div class="grid">
          <label class="capitalize ">hours</label>
          <div class="flex items-end gap-1">
            <input
              type="number"
              value={state.hours}
              class="w-56 min-w-min rounded-sm bg-slate-600 py-1 px-2 text-2xl text-white outline-none"
              onInput$={({ target }) =>
                // @ts-ignore
                (state.hours = (target as HTMLInputElement).value).replace(
                  /(?![0-9])./gim,
                  ""
                )
              }
            />
            <span class="">* $20</span>
          </div>

          <div class="flex items-end gap-1">
            <div class="grid">
              <label>Rate</label>
              <input
                type="number"
                step="100"
                value={state.hours * 20}
                class="pointer-events-none w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
              ></input>
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
            <input
              type="number"
              step="100"
              value={fullAmount}
              class="pointer-events-none flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
            ></input>
          </div>

          <div class="grid">
            <label>Tax + Accountant</label>
            <div class="flex items-end gap-1">
              <input
                type="number"
                step="100"
                value={(fullAmount * (100 - 10.67)) / 100}
                class="pointer-events-none flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
              ></input>
              <span class="text-red-600">- 10.67% </span>
            </div>
          </div>

          <div class="grid">
            <label>Inter Empresas Parado</label>
            <div class="flex items-end gap-1">
              <input
                type="number"
                step="100"
                value={fullAmount * (30 - 10.67)}
                class="pointer-events-none flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
              ></input>
              <span class="text-emerald-500"> {30 - 10.67}% </span>
            </div>
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
