export interface StatsType {
  global: {
    like_count: number;
    comment_count: number;
    stars: number;
    children_count: number;
  };
  session?: {
    like_status: boolean;
    comment_count: number;
    stars: number;
    children_count: number;
  };
}
