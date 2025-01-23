
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import id from 'date-fns/locale/id'
import { useState } from 'react'
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaCheckDouble, FaRetweet  } from 'react-icons/fa';
import { Modal } from 'flowbite-react';

const locale = id

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CalenderBooking({bookings}) {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previousMonth() {
    let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  let selectedDayMeetings = [];
  if (bookings && bookings.length > 0) {
    selectedDayMeetings = bookings.filter((booking) => {
      if (!booking.booking_date) {
        return false;
      } else if (booking.booking_status === 'rejected') {
        return false;
      }
      return isSameDay(parseISO(booking.booking_date), selectedDay);
    });
  }

  return (
    <div>
      <div className="max-w-xl px-4 mx-auto sm:px-7 md:max-w-4xl xl:max-w-full md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy', {locale})}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-md">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {bookings && bookings.filter((booking) => 
                      booking.booking_status !== 'rejected').some((booking) =>
                      isSameDay(parseISO(booking.booking_date), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Jadwal untuk{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'eeee, dd MMMM yyyy', {locale})}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((booking) => (
                  <Meeting booking={booking} key={booking.id} />
                ))
              ) : (
                <p>Tidak ada pertemuan untuk hari ini.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}

function Meeting({ booking }) {
  let DateTime = parseISO(booking.booking_date)
  const startTime = parse(booking.start_time, 'HH:mm:ss', new Date());
  const endTime = parse(booking.end_time, 'HH:mm:ss', new Date());
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState('');

  const handleOpenModal = (bookingNote) => {
    setNote(bookingNote);
    setOpenModal(true)
  }

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <span
        className="flex w-10 h-10 rounded-full items-center justify-center"
      > 
        {booking.booking_status === 'approved' && <FaCheckCircle style={{color: "green"}} size={30} />}
        {booking.booking_status === 'rejected' && <FaTimesCircle style={{color: "red"}} size={30}/>}            
        {booking.booking_status === 'pending' && <FaHourglassHalf style={{color: "gray"}} size={30}/>} 
        {booking.booking_status === 'returned' && <FaCheckDouble style={{color: "blue"}} size={30}/>}
        {booking.booking_status === 'moved' && <FaRetweet style={{color: "gray"}} size={30}/>}
                
      </span>
      <div className="flex-auto">
        <p className="text-gray-900">{booking.desk_activity}</p>
        <p className="text-gray-800">{booking.room_id ? booking.Room.name_room : booking.Tool.name_tool}</p>
        <p className="mt-0.5">
          <time dateTime={booking.start_time}>
            {format(startTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={booking.end_time}>
            {format(endTime, 'h:mm a')}
          </time>
        </p>
        {booking.booking_status === 'moved' && (
          <>
          <div className="">
          <button
              onClick={() => handleOpenModal(booking.note)}
              className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Catatan
            </button>
          </div>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className="p-2 font-sm">
              Alasan peminjaman Dipindahkan
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {note}
                </p>
              </div>
            </Modal.Body>
          </Modal>
          </>
        )}
        
      </div>
      
    </li>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]