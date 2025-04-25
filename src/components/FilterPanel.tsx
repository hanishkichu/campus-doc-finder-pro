
import React from 'react';
import { Doctor } from '../types/doctor';

interface FilterPanelProps {
  specialties: string[];
  selectedConsultationType: string | null;
  selectedSpecialties: string[];
  selectedSortOption: string | null;
  onConsultationTypeChange: (type: string | null) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (sortOption: string) => void;
  onClearAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  specialties,
  selectedConsultationType,
  selectedSpecialties,
  selectedSortOption,
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
  onClearAll
}) => {
  return (
    <div className="w-64 bg-white rounded-md shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={onClearAll} 
          className="text-sm text-doctorBlue hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Sort Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-sort"
          className="text-md font-medium mb-3 flex items-center justify-between"
        >
          Sort by
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={selectedSortOption === 'fees'}
              onChange={() => onSortChange('fees')}
              className="w-4 h-4 text-doctorBlue"
            />
            <span className="text-sm">Price: Low-High</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={selectedSortOption === 'experience'}
              onChange={() => onSortChange('experience')}
              className="w-4 h-4 text-doctorBlue"
            />
            <span className="text-sm">Experience: Most Experience first</span>
          </label>
        </div>
      </div>

      {/* Mode of Consultation Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc"
          className="text-md font-medium mb-3 flex items-center justify-between"
        >
          Mode of consultation
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={selectedConsultationType === 'video consult'}
              onChange={() => onConsultationTypeChange('video consult')}
              className="w-4 h-4 text-doctorBlue"
            />
            <span className="text-sm">Video Consult</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={selectedConsultationType === 'in clinic'}
              onChange={() => onConsultationTypeChange('in clinic')}
              className="w-4 h-4 text-doctorBlue"
            />
            <span className="text-sm">In Clinic</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={selectedConsultationType === null}
              onChange={() => onConsultationTypeChange(null)}
              className="w-4 h-4 text-doctorBlue"
            />
            <span className="text-sm">All</span>
          </label>
        </div>
      </div>

      {/* Specialties Filter */}
      <div>
        <h3 
          data-testid="filter-header-speciality"
          className="text-md font-medium mb-3 flex items-center justify-between"
        >
          Specialties
        </h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {specialties.map((specialty) => {
            const testId = `filter-specialty-${specialty.replace(/\s+/g, '-').replace(/\//g, '-')}`;
            return (
              <label key={specialty} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  data-testid={testId}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  className="w-4 h-4 text-doctorBlue"
                />
                <span className="text-sm">{specialty}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
