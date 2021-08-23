import BasicDatePicker from "./datepicker/datepicker.component";
import "./sidebar.styles.css";
/* interface Props{
import BasicDatePicker from './datepicker/datepicker.component';
    newslist:string[]
    callback:()=>void
} */
export const SideBar = () => {
  return (
    <div className="sidebar">
      <BasicDatePicker />
    </div>
  );
};
