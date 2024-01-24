import React from 'react'

const Learntail = () => {
  return (
    
<div class="flex flex-col bg-orange-500">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">#</th>
              <th scope="col" class="px-6 py-4">First</th>
              <th scope="col" class="px-6 py-4">Last</th>
              <th scope="col" class="px-6 py-4">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
              <td class="whitespace-nowrap px-6 py-4">Swapnil</td>
              <td class="whitespace-nowrap px-6 py-4">Joshi</td>
              <td class="whitespace-nowrap px-6 py-4">@insta</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
              <td class="whitespace-nowrap px-6 py-4">Urvi</td>
              <td class="whitespace-nowrap px-6 py-4">Joshi</td>
              <td class="whitespace-nowrap px-6 py-4">@watsapp</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4font-medium">3</td>
              <td class="whitespace-nowrap ">Yash</td>
              <td class="whitespace-nowrap px-6 py-4">Jain</td>
              <td class="whitespace-nowrap px-6 py-4">@twitter</td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">4</td>
              <td class="whitespace-nowrap ">Karan</td>
              <td class="whitespace-nowrap px-6 py-4">Jain</td>
              <td class="whitespace-nowrap px-6 py-4">@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default Learntail
