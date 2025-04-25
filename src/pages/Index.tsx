
import React, { useState, useEffect } from 'react';
import { Doctor } from '../types/doctor';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DoctorCard from '../components/DoctorCard';
import { fetchDoctors, getAllSpecialties } from '../services/doctorService';
import { 
  filterDoctorsByConsultationType, 
  filterDoctorsBySpecialties, 
  sortDoctorsByFees, 
  sortDoctorsByExperience,
  searchDoctorsByName
} from '../utils/filterUtils';
import { useQueryParams } from '../utils/queryParamUtils';

const DoctorListing: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    getParam, 
    getArrayParam, 
    setParam, 
    setArrayParam 
  } = useQueryParams();
  
  const selectedConsultationType = getParam('consultationType');
  const selectedSpecialties = getArrayParam('specialties');
  const selectedSortOption = getParam('sortBy');

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setSpecialties(getAllSpecialties(data));
        
        // Restore search term from URL if present
        const urlSearchTerm = getParam('search');
        if (urlSearchTerm) {
          setSearchTerm(urlSearchTerm);
        }
        
      } catch (error) {
        console.error('Error loading doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, []);

  // Apply all filters whenever the filter state or doctors data changes
  useEffect(() => {
    if (doctors.length === 0) return;
    
    let result = [...doctors];
    
    // Apply search filter
    if (searchTerm) {
      result = searchDoctorsByName(result, searchTerm);
    }
    
    // Apply consultation type filter
    if (selectedConsultationType) {
      result = filterDoctorsByConsultationType(result, selectedConsultationType);
    }
    
    // Apply specialties filter
    if (selectedSpecialties.length > 0) {
      result = filterDoctorsBySpecialties(result, selectedSpecialties);
    }
    
    // Apply sort
    if (selectedSortOption === 'fees') {
      result = sortDoctorsByFees(result);
    } else if (selectedSortOption === 'experience') {
      result = sortDoctorsByExperience(result);
    }
    
    setFilteredDoctors(result);
  }, [doctors, searchTerm, selectedConsultationType, selectedSpecialties, selectedSortOption]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      setParam('search', term);
    } else {
      setParam('search', null);
    }
  };
  
  const handleSuggestionSelect = (doctorName: string) => {
    setSearchTerm(doctorName);
    setParam('search', doctorName);
  };
  
  const handleConsultationTypeChange = (type: string | null) => {
    setParam('consultationType', type);
  };
  
  const handleSpecialtyChange = (specialty: string) => {
    const newSelectedSpecialties = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty];
      
    setArrayParam('specialties', newSelectedSpecialties);
  };
  
  const handleSortChange = (sortOption: string) => {
    setParam('sortBy', sortOption);
  };
  
  const handleClearAll = () => {
    setParam('consultationType', null);
    setArrayParam('specialties', []);
    setParam('sortBy', null);
    setParam('search', null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <header className="bg-doctorBlue py-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <SearchBar 
              doctors={doctors}
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Filter sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <FilterPanel 
              specialties={specialties}
              selectedConsultationType={selectedConsultationType}
              selectedSpecialties={selectedSpecialties}
              selectedSortOption={selectedSortOption}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSpecialtyChange={handleSpecialtyChange}
              onSortChange={handleSortChange}
              onClearAll={handleClearAll}
            />
          </aside>
          
          {/* Doctor listing */}
          <div className="flex-grow">
            {loading ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-doctorBlue mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading doctors...</p>
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="space-y-4">
                <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">No doctors found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;
