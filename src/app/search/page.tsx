import HotelSearchPage from "@/components/shared/search";
import SearchBar from "@/components/shared/searchbar";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
function SearchBarFallback() {
  return (
    <div className=" flex justify-center items-center h-screen w-full">
      <Loader2 className=" h-20 w-20 animate-spin text-red-500" />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />

          <HotelSearchPage />
        </Suspense>
      </nav>
    </>
  );
}
