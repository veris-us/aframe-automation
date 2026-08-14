import ServiceArchitecture from "./ServiceArchitecture";
import RestaurantArchitecture from "./RestaurantArchitecture";
import IndustrialArchitecture from "./IndustrialArchitecture";

export const architectureRegistry = {
  service: ServiceArchitecture,
  restaurant: RestaurantArchitecture,
  industrial: IndustrialArchitecture,
  medical: ServiceArchitecture,
  professional: ServiceArchitecture,
  nonprofit: ServiceArchitecture,
  data_management: IndustrialArchitecture,
};