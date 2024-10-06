// src/app/models/service-category.model.ts
export interface ServiceCategory {
    id: number;
    service_type: number;
    service_category: string;
    category_icon: string;
    banner_image: string;
    is_upcoming: number;
    status: number;
    created_at: string;
    updated_at: string;
  }