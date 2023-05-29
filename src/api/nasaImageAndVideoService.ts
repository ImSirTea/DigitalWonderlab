// Property names are shaped to fit the API directly, so that they can be more easily mapped onto the api call itself
type NasaImageAndVideoFilter = {
  q: string;
  location: string;
  media_string: string[]; // image, video, audio?
  page: number;
  page_size: number; // Defaults 100
  photographer: string;
  year_start: string; // YYYY @TODO: Should these be dates?
  year_end: string; // YYYY @TODO: Should these be dates?
} & NasaImageAndVideoQueryableProperties;

// Response property names are also named to match directly
type NasaImageAndVideoResponse = {
  collection: {
    version: string; // API Version
    href: string; // Search term
    items: {
      data: NasaImageAndVideoItemApiData[];
      href: string;
      links: NasaImageAndVideoLink[];
    }[];
    metadata: {
      total_hits: number;
    };
    links: unknown[]; // @TODO: Currently unimportant
  };
};

type NasaImageAndVideoLink = {
  href: string, ref: string, render: string
}

export type NasaImageAndVideoItem = {
  data: NasaImageAndVideoItemData;
  href: string;
};

type NasaImageAndVideoItemApiData = {
  date_created: string;
  description_508: string;
} & NasaImageAndVideoQueryableProperties;

type NasaImageAndVideoQueryableProperties = {
  center: string;
  description: string;
  keywords: string[]; // CSV
  nasa_id: string;
  secondary_creator: string;
  title: string;
};

export type NasaImageAndVideoItemData =
  Omit<NasaImageAndVideoItemApiData, "date_created">
  & { date_created: Date, image_src: string | null };

/**
 * Query params need to be strings, so parse them accordingly based on their type
 * @param value Filter value that needs to be parsed into a string
 */
function parseNasaImageAndVideoFilterProperty(
  value: NasaImageAndVideoFilter[keyof NasaImageAndVideoFilter]
) {
  // An array of strings is CSV format for the NASA API
  if (value instanceof Array<string>) {
    return value.join(",");
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "string") {
    return value;
  }

  throw new Error("Unknown type to parse for filter property");
}

export class NasaImageAndVideoService {
  static readonly nasaImageAndVideoServiceUrl = "https://images-api.nasa.gov/";

  private mapApiDataToUsableData(data: NasaImageAndVideoItemApiData, link: NasaImageAndVideoLink): NasaImageAndVideoItemData {
    return {
      center: data.center,
      date_created: new Date(data.date_created),
      description: data.description,
      description_508: data.description_508,
      keywords: data.keywords,
      nasa_id: data.nasa_id,
      secondary_creator: data.secondary_creator,
      title: data.title,
      image_src: link.render === "image" ? link.href : null,
    }
  }

  public async getImageOrVideoByFilter(
    filter: Partial<NasaImageAndVideoFilter>
  ): Promise<NasaImageAndVideoItem[]> {
    const imageOrVideoSearchUrl = new URL(
      "/search",
      NasaImageAndVideoService.nasaImageAndVideoServiceUrl
    );

    for (const [key, value] of Object.entries(filter)) {
      imageOrVideoSearchUrl.searchParams.append(
        key,
        parseNasaImageAndVideoFilterProperty(value)
      );
    }

    const response = await fetch(imageOrVideoSearchUrl, {
      method: "GET",
    });

    // @TODO: Would be nicer to have better error handling
    if (!response.ok) {
      throw new Error(
        `Failed to search using the Image or Video API. Filter: ${JSON.stringify(
          filter
        )}`
      );
    }

    const responseJson: NasaImageAndVideoResponse = await response.json();

    return responseJson.collection.items.map((item): NasaImageAndVideoItem => ({
      href: item.href,
      data: this.mapApiDataToUsableData(item.data[0], item.links[0])
    }))
  }
}

export const nasaImageAndVideoService = new NasaImageAndVideoService();
