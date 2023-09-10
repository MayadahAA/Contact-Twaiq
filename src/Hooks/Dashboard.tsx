import Calendar from '../Components/Calendar'
import NewRequest from './NewRequest'
function Dashboard() {
  return (
    <>
    <div className='flex-col'>

      <NewRequest/>
      <Calendar/>
    </div>
    </>
  )
}

export default Dashboard