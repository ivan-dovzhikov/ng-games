export const PaginationServiceName = 'PaginationService';

interface Char {
  type: string;
  char: string | number;
}

interface LinkChar extends Char {
  type: 'link';
  page: number;
}

export interface PaginationOptions {
  currentPage: number;
  lastPage: number;
}

export class PaginationService {
  private readonly ELLIPSIS_CHAR = String.fromCharCode(0x2026);
  private prevPage: number | null;
  private nextPage: number | null;
  public chars: (Char | LinkChar)[] = [];

  constructor(private options: PaginationOptions) {
    this.prevPage = options.currentPage - 1;
    this.nextPage = options.currentPage + 1;

    this.setChars();
  }

  setChars() {
    const { currentPage, lastPage } = this.options;
    const { ELLIPSIS_CHAR, prevPage, nextPage } = this;

    // Typescript thinks its possible to false get in the array
    (this.chars as any) = [
      currentPage > 1 && { type: 'link', char: '<', page: prevPage },
      currentPage > 2 && { type: 'link', char: 1, page: 1 },
      currentPage > 3 && { type: 'ellipsis', char: ELLIPSIS_CHAR },
      currentPage > 1 && { type: 'link', char: prevPage, page: prevPage },
      { type: 'current', char: currentPage },
      currentPage < lastPage && {
        type: 'link',
        char: nextPage,
        page: nextPage,
      },
      currentPage < lastPage - 2 && { type: 'ellipsis', char: ELLIPSIS_CHAR },
      currentPage < lastPage - 1 && {
        type: 'link',
        char: lastPage,
        page: lastPage,
      },
      currentPage < lastPage && { type: 'link', char: '>', page: nextPage },
    ].filter(Boolean);

    return this;
  }
}
