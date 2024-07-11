export const GetOrders = async () => {
  const orders = await fetch("https://app.snipcart.com/api/orders?limit=80", {
    headers: {
      Authorization: `Basic ${btoa(
        "ST_MzgwZGU3YzQtMWNlNC00YTY1LWE3YzAtODY0MDExMDRmYzhjNjM4NDkyMDc0Mjg0NjA1NTgw"
      )}`,
      Accept: "application/json",
    },
  });

  const json = await orders.json();
  return json.items;
};
