import { PropertyFeaturesCardProps } from '@/interface/ProjectDetails'

export default function PropertyFeaturesCard({
  name,
}: PropertyFeaturesCardProps) {
  return (
    <div className="flex items-center gap-x-2">
      <input
        id="inputId"
        checked
        type="checkbox"
        className="checkboxNew size-4 text-[#E59F00] focus:ring-0 cursor-pointer"
      />
      <label htmlFor="inputId" className="text-sm">
        {name}
      </label>
    </div>
  )
}
