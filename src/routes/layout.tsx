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
          <input
            type="number"
            value={state.hours === 0 ? "" : state.hours}
            class="w-56 min-w-min rounded-sm bg-slate-600 py-1 px-2 text-2xl text-white outline-none"
            onInput$={({ target }) =>
              // @ts-ignore
              (state.hours = (target as HTMLInputElement).value).replace(
                /(?![0-9])./gim,
                ""
              )
            }
          />

          <div class="flex items-end gap-1">
            <div class="grid">
              <label>Rate</label>
              <input
                value={`${(state.hours * 20).toLocaleString("pt-BR")} $`}
                class="w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
              ></input>
            </div>
            <span class="">* $20</span>
          </div>

          <div class="flex items-end gap-1">
            <div class="grid">
              <label>Amount</label>
              <input
                value={`${fullAmount.toLocaleString("pt-BR")} R$`}
                class="flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
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

          <div class="flex items-center gap-3">
            <div>
              <div class="grid">
                <label>Amount - Tax</label>
                <div class="flex items-end gap-1">
                  <input
                    value={`${(
                      (fullAmount * (100 - 10.67)) /
                      100
                    ).toLocaleString("pt-BR")} R$`}
                    class="flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
                  ></input>
                  <span class="text-red-600">- 10.67% </span>
                </div>
              </div>

              <div class="grid">
                <label>Inter Empresas Parado</label>
                <div class="flex items-end gap-1">
                  <input
                    value={`${(
                      (fullAmount * (30 - 10.67)) /
                      100
                    ).toLocaleString("pt-BR")} R$`}
                    class="flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
                  ></input>
                  <span class="text-emerald-500"> {30 - 10.67}% </span>
                </div>
              </div>
            </div>

            <div class="grid gap-4 pt-8">
              <div class="grid">
                <div class="flex items-end gap-1">
                  <input
                    value={`${((fullAmount * 30) / 100).toLocaleString(
                      "pt-BR"
                    )} R$`}
                    class="flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
                  ></input>
                  <span class="text-red-500"> 30% </span>
                </div>
              </div>

              <div class="grid">
                <div class="flex items-end gap-1">
                  <input
                    value={`${((fullAmount * 70) / 100).toLocaleString(
                      "pt-BR"
                    )} R$`}
                    class="flex w-56 min-w-min whitespace-nowrap rounded bg-slate-700 py-1 px-2 text-2xl"
                  ></input>
                  <span class="text-emerald-500"> 70% </span>
                </div>
              </div>
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
