// import SearchButton from "./SearchButton";
import AppointmentButton from "./AppointmentButton";
import MobileMenu from "./MobileMenu";

export default function HeaderActions() {
  return (
    <>
      {/* <SearchButton /> */}
      <div className="flex justify-end items-center gap-2 ">
        <AppointmentButton />
        <MobileMenu />
      </div>
    </>
  );
}
