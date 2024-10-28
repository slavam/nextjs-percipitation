// import Form from '@/app/ui/measurements/view';
import Breadcrumbs from '@/app/ui/measurements/breadcrumbs';
import { fetchMeasurement, fetchPollutionsForMeasurement } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts'
 
export default async function Page(props) {
  const params = await props.params;
  const id = params.id
  const [measurement, pollutions] = await Promise.all([
    fetchMeasurement(id),
    fetchPollutionsForMeasurement(id),
  ]);
  // console.log(measurement)
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Измерения', href: '/dashboard/measurements' },
          {
            label: 'Данные измерения',
            href: `/dashboard/measurements/${id}/view`,
            // active: true,
          },
        ]}
      />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Измерение</h1>
        </div>
        <div className="flex w-full items-center justify-between">
          <h2>Id: {id}; Дата измерения: {measurement.date.toLocaleDateString('ru')}; Срок: {measurement.term}; Пост: {measurement.name}; 
            Температура: {measurement.temperature}°С; Давление: {measurement.atmosphere_pressure}hPa; Скорость ветра: {measurement.wind_speed}м/с; 
            Направление ветра: {measurement.wind_direction*10}°; </h2>
        </div>
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Загрязнения</h1>
        </div>
        <ul>
        {pollutions.map((p) => {return (<li key={p.id}>{p.name}: Оптическая плотность: {p.value}; Концентрация: {p.concentration};</li>)})}
        </ul>
      </div>
      {/* <Form measurement={measurement} pollutions={pollutions} /> */}
    </main>
  );
}