import { OptionalLabel } from "./icons";

export default function OptionalChoices() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <fieldset className="w-[88%] flex flex-col justify-start">
        <legend className="w-full flex flex-row justify-between">
          <p className="text-black font-medium text-base">اضافات</p>
          <OptionalLabel />
        </legend>

        <div className="py-3 border-b border-gray-300">
          <label className="flex flex-row justify-between">
            <p className="text-black text-[13px] font-normal">كراميل</p>
            <p className="flex flex-row gap-4">
              <span className="text-xs font-normal">+ 2.00 رس</span>
              <input type="checkbox" name="addons" value="caramel" />
            </p>
          </label>
        </div>

        <div className="py-3 border-b border-gray-300">
          <label className="flex flex-row justify-between">
            <p className="text-black text-[13px] font-normal">شوكولاتة</p>
            <p className="flex flex-row gap-4">
              <span className="text-xs font-normal">+ 3.00 رس</span>
              <input type="checkbox" name="addons" value="chocolate" />
            </p>
          </label>
        </div>

        <div className="py-3 border-b border-gray-300">
          <label className="flex flex-row justify-between">
            <p className="text-black text-[13px] font-normal">فانيليا</p>
            <p className="flex flex-row gap-4">
              <span className="text-xs font-normal">+ 1.50 رس</span>
              <input type="checkbox" name="addons" value="vanilla" />
            </p>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
