import {
  createRef,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apartmentFormLabels } from "../Assets/Create";
import { ApplicationContext } from "../Contexts/ApplicationContext";
import { AuthContext } from "../Contexts/AuthContext";
import { Apartment } from "../Data/builders/Apartment";
import { IApartment } from "../Data/interfaces/IApartment";
import { IErrosListObject } from "../Data/interfaces/IValidation";
import { AuthContextType } from "../Data/types/Auth";
import { AppContextType } from "../Data/types/Private";
import { getApartmentView } from "../Services/Api/ApartmentApi";

function useEditApartmentData() {
  const editFormRefs: Ref<any> = useRef(
    apartmentFormLabels.map(() => createRef()),
  );
  const [errorList, setErrorList] = useState<IErrosListObject>({});
  const [searchParams] = useSearchParams();
  const [apartment, setApartment] = useState<IApartment | null>(null);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [newImages, setNewImages] = useState<File[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    changeLoading(true);
    const currentApartmentId = searchParams.get("apartmentId") as string;
    getApartmentView(currentApartmentId).then((data) => {
      initEditData(data.apartment);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onCancel = () => {
    return navigate("/");
  };

  const navigateToApartmentPage = (id: string) => {
    return navigate(`/apartment?apartmentId=${id}`);
  };

  const changeLoading = (status: boolean) => setLoading(status);
  const changeErrors = (update: IErrosListObject) => setErrorList(update);
  const changeCity = (newCity: string) => setCity(newCity);
  const initEditData = (currentApartment: Apartment) => {
    setApartment(currentApartment);
    setCity(currentApartment.city);
    setLoading(false);
  };

  const changeImages = useCallback(
    (updateImages: string[]) => {
      if (apartment) {
        let mainImageIndex = apartment.mainImageIndex;
        const lastImagesIndex = updateImages.length + newImages.length - 1;
        if (mainImageIndex >= lastImagesIndex) {
          mainImageIndex = lastImagesIndex;
        }
        setApartment({
          ...apartment,
          images: updateImages,
          mainImageIndex: mainImageIndex,
        });
      }
    },
    [apartment, newImages.length],
  );

  const changeMainImageIndex = useCallback(
    (updateMainImageIndex: number) => {
      if (apartment) {
        setApartment({ ...apartment, mainImageIndex: updateMainImageIndex });
      }
    },
    [apartment],
  );

  const changeNewImages = useCallback((newImages: File[]) => {
    setNewImages(newImages);
  }, []);

  const getDefaultValue = (key: string) => {
    if (apartment) {
      return apartment[key];
    }
    return "";
  };

  return {
    editData: {
      apartment,
      editFormRefs,
      searchParams,
      errorList,
      newImages,
      loading,
      city,
    },
    functions: {
      changeLoading,
      initEditData,
      changeErrors,
      changeImages,
      setCity,
      changeCity,
      changeMainImageIndex,
      changeNewImages,
      onCancel,
      navigateToApartmentPage,
      getDefaultValue,
    },
  };
}

function useApartmentsMetaData() {
  const { authState, setLoading } = useContext(AuthContext) as AuthContextType;
  const { setOwnerStatisticsData } = useContext(
    ApplicationContext,
  ) as AppContextType;
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { getAllApartments } = await import("../Services/Api/ApartmentApi");
      const { apartmentsResults, dashboardResults } = await getAllApartments(
        authState.mobile,
      );
      setApartments(apartmentsResults);
      setOwnerStatisticsData(dashboardResults);
    } catch (error) {
      setApartments([]);
    }
    setLoading(false);
  };

  return {
    authState,
    apartments,
    fetchData,
  };
}
export { useEditApartmentData, useApartmentsMetaData };
