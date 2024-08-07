import {
  AreaBookmark,
  BookmarkAPIType,
  BookmarkWithArea,
  RecommendResponse,
} from "@/types/Recommend";
import { AxiosInstance } from "axios";

class BookmarkAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
  // 유저 정보에 따른 북마크들을 가져옵니다.
  async getBookmarks(): Promise<RecommendResponse<BookmarkWithArea[]>> {
    const path = "/api/bookmark";
    const response =
      await this.axios.get<RecommendResponse<BookmarkWithArea[]>>(path);
    const data = response.data;

    return data;
  }

  async addBookmark(
    data: BookmarkAPIType
  ): Promise<RecommendResponse<AreaBookmark>> {
    const { areaId } = data;
    const path = "/api/bookmark";
    const response = await this.axios.post<RecommendResponse<AreaBookmark>>(
      path,
      { areaId }
    );
    return response.data;
  }

  async deleteBookmark(
    data: BookmarkAPIType
  ): Promise<RecommendResponse<AreaBookmark>> {
    const { areaId } = data;
    const path = "/api/bookmark";
    const response = await this.axios.delete<RecommendResponse<AreaBookmark>>(
      path,
      {
        data: { areaId },
      }
    );
    return response.data;
  }
}

export default BookmarkAPI;
