export type VerificationStatus = 'draft' | 'under_review' | 'verified' | 'needs_update' | 'archived';
export type UserRole = 'admin' | 'editor' | 'reviewer' | 'user';
export type ClassificationType = 'therapeutic' | 'pharmacological' | 'mechanism' | 'chemical' | 'ATC';
export type EntityType = 'medicine' | 'drug_class' | 'medical_term' | 'flashcard';
export type InteractionSeverity = 'minor' | 'moderate' | 'major' | 'contraindicated';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Medicine {
  id: string;
  generic_name: string;
  display_name?: string;
  active_ingredient?: string;
  salt?: string;
  description?: string;
  strength?: string;
  dosage_forms?: string[];
  routes?: string[];
  mechanism_of_action?: string;
  pharmacodynamics?: string;
  absorption?: string;
  distribution?: string;
  metabolism?: string;
  excretion?: string;
  bioavailability?: string;
  half_life?: string;
  protein_binding?: string;
  volume_of_distribution?: string;
  clearance?: string;
  onset?: string;
  duration?: string;
  indications?: string[];
  contraindications?: string[];
  warnings?: string[];
  precautions?: string[];
  common_adverse_effects?: string[];
  serious_adverse_effects?: string[];
  food_interactions?: string[];
  monitoring?: string[];
  storage?: string;
  patient_counselling?: string;
  pregnancy?: string;
  lactation?: string;
  pediatric?: string;
  geriatric?: string;
  renal?: string;
  hepatic?: string;
  advantages?: string[];
  disadvantages?: string[];
  key_points?: string[];
  memory_trick?: string;
  key_suffix?: string;
  verification_status: VerificationStatus;
  source?: string;
  source_url?: string;
  last_verified?: string;
  data_version?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  country?: string;
  website?: string;
  source?: string;
  verified: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Brand {
  id: string;
  brand_name: string;
  medicine_id: string;
  manufacturer_id?: string;
  composition?: string;
  strength?: string;
  dosage_form?: string;
  route?: string;
  source?: string;
  source_url?: string;
  verified: boolean;
  last_verified?: string;
  manufacturers?: Manufacturer | null;
  medicines?: Medicine | null;
}

export interface DrugClass {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
  classification_type: ClassificationType;
  pronunciation?: string;
  simple_definition?: string;
  hindi_explanation?: string;
  hinglish_explanation?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MedicalTerm {
  id: string;
  term: string;
  simple_definition?: string;
  clinical_definition?: string;
  hindi_explanation?: string;
  hinglish_explanation?: string;
  pronunciation?: string;
  ipa?: string;
  related_terms?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Pronunciation {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  english_pronunciation?: string;
  phonetic_pronunciation?: string;
  hindi_friendly_pronunciation?: string;
  ipa?: string;
  audio_url?: string;
  verified: boolean;
  last_verified?: string;
}

export interface Reference {
  id: string;
  source_name: string;
  source_type?: string;
  title: string;
  url?: string;
  publication_date?: string;
  accessed_date?: string;
  notes?: string;
}

export interface DrugInteraction {
  id: string;
  medicine_a_id: string;
  medicine_b_id: string;
  severity: InteractionSeverity;
  interaction: string;
  mechanism?: string;
  clinical_significance?: string;
  professional_consideration?: string;
  reference_id?: string;
  verified: boolean;
  medicine_b?: Medicine;
}

export interface Favorite {
  id: string;
  user_id: string;
  entity_type: EntityType;
  entity_id: string;
  created_at: string;
}

export interface RecentlyViewed {
  id: string;
  user_id: string;
  entity_type: EntityType;
  entity_id: string;
  viewed_at: string;
}

export interface LearningProgress {
  id: string;
  user_id: string;
  entity_type: EntityType;
  entity_id: string;
  status: 'new' | 'learning' | 'mastered';
  score: number;
  review_count: number;
  correct_count: number;
  incorrect_count: number;
  last_reviewed?: string;
  next_review?: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewSchedule {
  id: string;
  user_id: string;
  item_id: string;
  item_type: string;
  ease_factor: number;
  interval_days: number;
  repetition_number: number;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_user_id?: string;
  action: string;
  table_name: string;
  record_id: string;
  old_data?: Record<string, any>;
  new_data?: Record<string, any>;
  created_at: string;
}

export interface MedicineFilterOptions {
  search?: string;
  therapeuticClassId?: string;
  dosageForm?: string;
  route?: string;
  verificationStatus?: VerificationStatus;
  sortBy?: 'name_asc' | 'name_desc' | 'recently_added' | 'recently_updated';
  page?: number;
  pageSize?: number;
}
