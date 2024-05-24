<div className=" py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="px-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Detail Reservasi</span>
                           
                </div>
                <div className="md:flex-1 px-4">
                    <div className="rounded-md bg-gray-300 dark:bg-gray-700 mb-4">
                        <img className="h-48 w-full rounded-lg object-cover" src={`http://localhost:3000/images/${detail.gambar_room}`} alt={detail.name_room}/>
                    </div>
                    <div class="flex -mx-2 mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">{peminjam}  {kontak}</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.</span>
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="flex items-start text-2xl font-bold text-gray-800 dark:text-white mb-2">{nameReserve} {id}</h2>
                    <div className="flex mb-4">
                        <div className="mr-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">tanggal:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{booking_date}</span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">waktu:</span>
                            <span className="text-gray-600 dark:text-gray-300 ml-2">{start_time} - {end_time}</span>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">status:</span>
                        
                        <span className="text-gray-600 dark:text-gray-300 ml-2">{booking_status}</span>
                    
                    </div>
                    <div className="mb-4">
                        <span className="flex items-start font-bold text-gray-700 dark:text-gray-300">Fasilitas:</span>
                        <p className="flex items-start text-gray-600 dark:text-gray-300 text-sm mt-2">
                            {detail.fasilitas}
                        </p>
                    </div>    
                </div>
            </div>
        </div>
    </div>

<div className="border rounded-lg overflow-hidden shadow-lg bg-white border-gray-200">
<img src={`http://localhost:3000/images/${imageSource}`} alt={nameReserve} className="w-full h-48 object-cover" />
<div className="p-4">
  <h2 className="text-xl font-semibold mb-2">{nameReserve}</h2>
  <p className="text-gray-600 mb-2">Tanggal: {booking_date}</p>  
  <p className="text-gray-600 mb-2">Reservation Time: {start_time}-{end_time}</p>
  <p className="text-gray-600 mb-2">Guest Name: {peminjam}</p>
  <p className="text-gray-600 mb-2">Booking Status: {booking_status}</p>
  <p className="text-gray-600 mb-2">Activity Description: baru</p>
</div>
</div>