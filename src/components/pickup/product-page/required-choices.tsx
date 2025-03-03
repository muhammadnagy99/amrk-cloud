import { RequiredLabel } from "./icons";

export default function RequiredChoices() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <fieldset className="w-[88%] flex flex-col justify-start">
        <legend className="w-full flex flex-row justify-between">
          <p className="text-black font-medium text-base">الحجم</p>
          <RequiredLabel />
        </legend>
        <div className="py-3 border-b border-gray-300">
          <label className="flex flex-row justify-between">
            <p className="text-black text-[13px] font-normal">صغير</p>
            <input type="radio" name="size" value="small" />
          </label>
        </div>
        <div className="py-3 border-b border-gray-300">
          <label className="flex flex-row justify-between">
            <p className="text-black text-[13px] font-normal">وسط</p>
            <p className="flex flex-row gap-4">
              <span className="text-xs font-normal">+ 2.00 رس</span>
              <input type="radio" name="size" value="medium" />
            </p>
          </label>
        </div>
        <div className="py-3 border-b border-gray-300">
          <label className="flex flex-row justify-between">
            <p className="text-black text-[13px] font-normal">كبير</p>
            <p className="flex flex-row gap-4">
              <span className="text-xs font-normal">+ 6.00 رس</span>
              <input type="radio" name="size" value="large" />
            </p>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
