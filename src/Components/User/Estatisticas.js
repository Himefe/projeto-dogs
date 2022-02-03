import React from "react";
import { USER_STATS } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
const EstatisticasGrafico = React.lazy(() => import("./EstatisticasGrafico"));

const Estatisticas = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = USER_STATS();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <>
        <React.Suspense fallback={<Loading />}>
          <EstatisticasGrafico data={data} />
        </React.Suspense>
      </>
    );
  } else {
    return null;
  }
};

export default Estatisticas;
