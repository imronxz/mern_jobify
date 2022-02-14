import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer.js';

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  //* Paggination Buttons Previous page
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) newPage = numOfPages
    changePage(newPage)
  };
  //* Paggination Buttons Next page
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) newPage = 1
    changePage(newPage)
  };
  const halaman = Array.from({ length: numOfPages }, (_, index) => index + 1);

  return (
    <Wrapper>
      {/* Prev Button */}
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      {/* Jumlah Halaman */}
      <div className="btn-container">
        {halaman.map((pageNumber) => (
          <button
            type="button"
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {/* Next button */}
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
