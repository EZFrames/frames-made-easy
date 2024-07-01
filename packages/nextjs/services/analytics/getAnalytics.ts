export const getTotalInteractions = async (startDate: string, endDate: string, journeyId = "") => {
  let queryparams = "?startDate=" + startDate + "&endDate=" + endDate;
  if (journeyId !== "") {
    queryparams = `?startDate=${startDate}&endDate=${endDate}&journeyId=${journeyId}`;
  }
  const res = await fetch(`/api/analytics/total_interactions` + queryparams);
  const data = await res.json();
  return data.totalUsers;
};

export const getUniqueUsers = async (startDate: string, endDate: string, journeyId = "") => {
  let queryparams = "?startDate=" + startDate + "&endDate=" + endDate;
  if (journeyId !== "") {
    queryparams = `?startDate=${startDate}&endDate=${endDate}&journeyId=${journeyId}`;
  }
  const res = await fetch(`/api/analytics/unique_fids` + queryparams);
  const data = await res.json();
  return data.uniqueFids;
};

export const getTop5Journeys = async (startDate: string, endDate: string) => {
  const queryparams = "?startDate=" + startDate + "&endDate=" + endDate;
  const res = await fetch(`/api/analytics/top5journeys` + queryparams);
  const data = await res.json();
  return data;
};

export const getTotalInteractionsGraph = async (startDate: string, journeyId = "") => {
  let queryparams = "?startDate=" + startDate;
  if (journeyId !== "") {
    queryparams += `&journeyId=${journeyId}`;
  }
  const res = await fetch(`/api/analytics/total_interactions/graph` + queryparams);
  const data = await res.json();
  const finalGraph = [];
  const currentDate = new Date(startDate);
  const endDateObj = new Date();
  const adjustedDateObj = new Date(endDateObj.getTime() + 1 * 24 * 60 * 60 * 1000);
  while (currentDate <= adjustedDateObj) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const entry = data.find((entry: any) => {
      const entryDateStr = new Date(entry.date).toISOString().split("T")[0];
      return entryDateStr === dateStr;
    });
    if (entry) {
      finalGraph.push(entry);
    } else {
      finalGraph.push({ date: dateStr, count: 0 });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return finalGraph;
};

export const getUniqueUsersGraph = async (startDate: string, journeyId = "") => {
  let queryparams = "?startDate=" + startDate;
  if (journeyId !== "") {
    queryparams += `&journeyId=${journeyId}`;
  }
  const res = await fetch(`/api/analytics/unique_fids/graph` + queryparams);
  const data = await res.json();
  const finalGraph = [];
  const currentDate = new Date(startDate);
  const endDateObj = new Date();
  const adjustedDateObj = new Date(endDateObj.getTime() + 1 * 24 * 60 * 60 * 1000);
  while (currentDate <= adjustedDateObj) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const entry = data.find((entry: any) => {
      const entryDateStr = new Date(entry.date).toISOString().split("T")[0];
      return entryDateStr === dateStr;
    });
    if (entry) {
      finalGraph.push(entry);
    } else {
      finalGraph.push({ date: dateStr, count: 0 });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return finalGraph;
};

export const GetOrders = async (journeyId: string, startDate: string) => {
  let queryparams = "?startDate=" + startDate;
  if (journeyId !== "") {
    queryparams += `&journeyId=${journeyId}`;
  }
  const res = await fetch(`/api/order` + queryparams, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};
