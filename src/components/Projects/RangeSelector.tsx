/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getTrackBackground, Range } from 'react-range'

interface PriceRangeSelectorProps {
  minValue: number
  maxValue: number
  handleChange: (values: number[]) => void
}

const STEP = 10
const MIN = 0
const MAX = 10000

const PriceRangeSelector = ({
  minValue,
  maxValue,
  handleChange,
}: PriceRangeSelectorProps) => {
  const values = [minValue, maxValue]
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        draggableTrack
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={false}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="w-full bg-gray-700 rounded-xl"
          >
            <div
              ref={props.ref}
              className="h-1 w-full bg-yellow-500 rounded-md"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#eab308', '#ccc'],
                  min: MIN,
                  max: MAX,
                  rtl: false,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className="size-4 bg-yellow-500 rounded-full"
          >
            <div className="size-4 bg-yellow-500 rounded-full" />
          </div>
        )}
      />
    </div>
  )
}

export default PriceRangeSelector
