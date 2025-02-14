// app/[locale]/doctors/[slug]/page.js
import React from 'react'
import DoctorItemHead from '@/app/[locale]/components/Doctors/DoctorItemHead'
import DoctorItemInfo from '@/app/[locale]/components/Doctors/DoctorItemInfo'
import { client } from '@/sanity/lib/client'
import Application from '../../components/Application'
import Services from '../../components/Doctors/Services'
import Address from '../../components/Doctors/Address'

export default async function DoctorPage({ params }) {
  const { slug, locale } = params

  // Fetching doctor data by slug, including services
  const doctor = await client.fetch(
    `*[_type == "doctor" && slug.current == $slug][0]{
      ...,
      services[]->{
        name,
        slug,
        category->{name}
      }
    }`,
    { slug }
  )

  if (!doctor) {
    return <div>Доктор не найден</div>
  }

  return (
    <div className='px-2 w-full bg-white'>
      <div className='w-full max-w-[1400px] flex flex-col gap-32 mx-auto py-12 pb-32'>
        <DoctorItemHead doctor={doctor} locale={locale} />
        <DoctorItemInfo doctor={doctor} locale={locale} />
        <Services services={doctor.services} locale={locale} />
        <Address />
        <Application />
      </div>
    </div>
  )
}
