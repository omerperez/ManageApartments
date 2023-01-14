import { createRef, Ref, useCallback, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apartmentFormLabels } from "../Assets/Create";
import { Apartment } from "../Data/builders/Apartment";
import { IApartment } from "../Data/interfaces/IApartment";
import { IErrosListObject } from "../Data/interfaces/IValidation";

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
        setApartment({
          ...apartment,
          images: updateImages,
        });
      }
    },
    [apartment?.images],
  );

  const getMainImageIndex = (index: number) => {
    if (apartment && index >= newImages.length + apartment.images.length) {
      return 0;
    }
    return index;
  };

  const changeMainImageIndex = useCallback(
    (updateMainImageIndex: number) => {
      if (apartment) {
        setApartment({
          ...apartment,
          mainImageIndex: getMainImageIndex(updateMainImageIndex),
        });
      }
    },
    [apartment?.mainImageIndex],
  );

  const changeNewImages = useCallback((newImages: File[]) => {
    setNewImages(newImages);
  }, []);

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
    },
  };
}

export { useEditApartmentData };
