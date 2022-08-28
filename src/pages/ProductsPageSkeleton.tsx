import Skeleton from "@mui/material/Skeleton";

export const ProductsPageSkeleton = () => {
  return (
    <section>
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={210} />
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={210} />
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={210} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </section>
  );
};
