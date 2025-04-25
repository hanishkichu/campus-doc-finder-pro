
import { Doctor } from '../types/doctor';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    
    const data = await response.json();
    
    // Transform the API data to match our Doctor interface
    return data.map((item: any) => {
      // Extract specialties from the API response
      const specialties = item.specialities 
        ? item.specialities.map((s: any) => s.name) 
        : [];
      
      return {
        id: item.id || '',
        name: item.name || '',
        specialty: specialties,
        qualification: item.doctor_introduction || '',
        experience: parseInt(item.experience?.split(' ')[0]) || 0,
        clinic: item.clinic?.name || '',
        location: item.clinic?.address?.city || '',
        fee: parseInt(item.fees?.replace('₹ ', '')) || 0,
        consultationType: [
          ...(item.video_consult ? ['video consult'] : []),
          ...(item.in_clinic ? ['in clinic'] : [])
        ],
        rating: 0, // API doesn't have ratings
        profilePic: item.photo || ''
      };
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

export function getAllSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    if (doctor.specialty && doctor.specialty.length > 0) {
      doctor.specialty.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
}
