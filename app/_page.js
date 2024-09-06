// import Image from "next/image";
import SideNav from './ui/dashboard/sidenav'
// import connection from "./mysql";

export default async function Home() {
  // let data = await fetch('http://localhost:3001/other_observations/monthly_precipitation.json?year=2023&month=10')
  const qParams = {
    stations: '34519,34524,34622,34721,34615,34712',
    notbefore: '2024-09-01T00:00:00',
    notafter: '2024-09-30T00:00:00',
  }
  let data = await fetch(`http://localhost:3001/observations/observations?limit=0&sources=100&streams=0&hashes=870717212&min_quality=1&syn_hours=15:00,03:00&stations=${qParams.stations}&after=${qParams.notbefore}`)
  let observations = await data.json()
  let perc = new Array(6).fill(null)
  observations.forEach(o => {
    let i = qParams.stations.split(',').indexOf(o.station)
    let j = +o.meas_time.slice(8,10)
    if(i>=0){
      perc[i] = perc[i] || [i]
      o.syn_hour==="03:00"? perc[i][j*2-1]=o.value : perc[i][j*2]=o.value
    }
  });
  let body = []
  const mStations = ['Донецк','Дебальцево','Амвросиевка','Седово','Волноваха','Мариуполь']
  for (let i = 0; i < 6; i++) {
    let row = [<td key={i+100} className="whitespace-nowrap bg-white px-4 py-5 text-sm">{mStations[i]}</td>]
    let j = 1
    while (j < perc[i].length) {
      row.push(<td key={i} className="whitespace-nowrap bg-white px-2 py-5 text-sm">{perc[i][j]?perc[i][j]:''}/{perc[i][j+1]?perc[i][j+1]:''}</td>);
      j+=2
    }
    body.push(<tr key={i} className="group">{row}</tr>)
  }
  // let today = new Date()
  let currYear = 2024 //today.getFullYear()
  let currMonth = 9 //today.getMonth()
  let lastDay = 32 - new Date(currYear, currMonth-1, 32).getDate()
  let header = []
  for(let i = 1; i <= lastDay; i++){
    header.push(<th key={i} scope="col" className="px-3 py-5 font-medium">{i}</th>)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div>
        <h1>Осадки по данным метеостанций за {currMonth} месяц {currYear} года</h1>
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-400 text-left text-sm font-normal">
            <tr key="0">
              <th key="0" scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Метеостанция
              </th>
              {header}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-900">
            {body}
          </tbody>
        </table>
        {/* <ul>
          {perc.map((item,i) => (
            <li key={i}>{JSON.stringify(item)}</li>
          ))}
        </ul> */}
      </div>
      <div>
        <h1>Осадки по данным гидропостов за {currMonth} месяц {currYear} года</h1>
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
            <tr key="00">
              <th key="00" scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Гидропост
              </th>
              {/* {header} */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-900">
            {/* {body} */}
          </tbody>
        </table>
      </div>
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.js</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

      {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}
{/* 
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}

// export const getServerSideProps = async ()  => {
// export async function getServerSideProps() {
//   const [rows] = await connection.promise().query("SELECT * FROM other_observations where data_type ='perc' and obs_date between '2023-10-01' and '2024-09-01'");
//   return {
//     props: {
//       data: rows,
//     },
//   };
// }