import { Grid } from "@mui/material";
import { createRef, useContext, useEffect, useState } from "react";
import BillTenantRow from "../Components/Calculators/BillTenantRow";
import CalculateTitle from "../Components/Calculators/CalculateTitle";
import { AuthContext } from "../Contexts/AuthContext";
import { AuthContextType } from "../Data/types/Auth";
import "../Layout/CSS/Bills.css";
import "../Layout/CSS/Layout.css";
import Loading from "../Layout/Loading";
import ApiService from "../Services/Api/OtherApi";
import TenantApiService from "../Services/Api/TenantApi";

interface Props {
  type: "water" | "electric";
}
export default function Bills({ type }: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  const [electricPrice, setElectricPrice] = useState<number>(0);
  const [lowWaterPrice, setLowWaterPrice] = useState<number>(0);
  const [isShowTotalPrice, setIsShowTotalPrice] = useState<{
    water: boolean;
    electric: boolean;
  }>({
    water: false,
    electric: false,
  });
  const { authState } = useContext(AuthContext) as AuthContextType;
  const [agreementsData, setAgreementsData] = useState<
    {
      id: string;
      name: string;
      agreementsCount: number;
      isActive: boolean;
    }[]
  >([]);
  const [electricRefs, setElectricRefs] = useState<any[]>([]);
  const [waterRefs, setWaterRefs] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { water, electric } = await ApiService.getCalculatorPrices();
        setLowWaterPrice(water.low);
        setElectricPrice(electric / 100);
        const data = await TenantApiService.getAgreemntsCountForEactTenant(
          authState.mobile,
        );
        setAgreementsData(data);
        const refs = data.map(() => createRef());
        setElectricRefs(refs);
        setWaterRefs(refs);
      } catch (error) {
        setAgreementsData([]);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  const ELECTRIC_TITLE = "חישוב חשמל";
  const WATER_TITLE = "חישוב מים";

  const onClickMultipleCalc = () => {
    if (type === "water") {
      return setIsShowTotalPrice({
        ...isShowTotalPrice,
        water: true,
      });
    }
    return setIsShowTotalPrice({
      ...isShowTotalPrice,
      electric: true,
    });
  };

  const initIsShowTotalPrice = () => {
    if (type === "water") {
      return setIsShowTotalPrice({
        ...isShowTotalPrice,
        water: false,
      });
    }
    return setIsShowTotalPrice({
      ...isShowTotalPrice,
      electric: false,
    });
  };

  return (
    <div className="bills-layout">
      {type === "electric" ? (
        <>
          <CalculateTitle
            title={ELECTRIC_TITLE}
            price={electricPrice}
            unit={"קוט״ש"}
            onClickMultipleCalc={onClickMultipleCalc}
          />
          <Grid container className="bill-tenant-row-container">
            {agreementsData.map((tenant, index) => (
              <Grid item xs={12} sm={6}>
                <BillTenantRow
                  key={`bill-electric-row${tenant.id}`}
                  name={tenant.name}
                  previousMonthAppointed={53534}
                  currentMonthAppointed={index % 2 === 0 ? 56543 : undefined}
                  price={electricPrice}
                  type={"electric"}
                  isShowTotalPrice={isShowTotalPrice.electric}
                  initIsShowTotalPrice={initIsShowTotalPrice}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <div className="d-flex ">
            <CalculateTitle
              title={WATER_TITLE}
              price={lowWaterPrice}
              unit={"מ״ק"}
              onClickMultipleCalc={onClickMultipleCalc}
            />
          </div>
          <div className="bill-tenant-row-container mb-5">
            {agreementsData.map((tenant, index) => (
              <BillTenantRow
                key={`bill-water-row${tenant.id}`}
                name={tenant.name}
                previousMonthAppointed={53534}
                currentMonthAppointed={index % 2 === 0 ? 56543 : undefined}
                price={lowWaterPrice}
                type={"water"}
                ref={waterRefs[index]}
                isShowTotalPrice={isShowTotalPrice.water}
                initIsShowTotalPrice={initIsShowTotalPrice}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
