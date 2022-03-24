import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as DayCloudIcon } from "./images/day-cloudy.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";

function App() {
	return (
		<div className="flex justify-center items-center h-full bg-container">
			<div className="relative min-w-card bg-card shadow-card box-border py-8 px-4">
				<h1 className="text-[28px] text-title mb-5">Taipei</h1>
				<div className="text-default text-lg mb-8">多雲時晴</div>
				<div className="flex justify-between items-center mb-8">
					<div className="flex text-8xl text-temperature font-light">
						23 <span className="font-normal text-5xl">°C</span>
					</div>
					<DayCloudIcon />
				</div>
				<div className="flex items-center text-base font-light text-default mb-5">
					<AirFlowIcon className="w-6 h-auto mr-7" /> 23 m/h
				</div>
				<div className="flex items-center text-base font-light text-default">
					<RainIcon className="w-6 h-auto mr-7" /> 48%
				</div>
				<div className="absolute right-4 bottom-4 text-xs inline-flex items-end text-default">
					最後觀測時間：上午 12:03{" "}
					<RefreshIcon className="ml-3 w-4 h-4 cursor-pointer" />
				</div>
			</div>
		</div>
	);
}

export default App;
