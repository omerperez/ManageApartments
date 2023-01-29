import { image403 } from "../../Assets/StaticImages";

const useError403 = (currentTarget: any) => {
  console.log(currentTarget);
  currentTarget.src = image403;
  currentTarget.onerror = null;
};

export { useError403 };
