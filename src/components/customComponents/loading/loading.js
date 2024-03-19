function Loading({ height, width }) {
  return (
    <div className="flex gap-4 md:w-[479px] w-[90%] flex-col items-start justify-start">
      <div className="flex items-center justify-center mx-auto w-full">
        <div
          className={`${width} ${height} border-4 border-sky-700 border-dotted rounded-full animate-spin`}
        />
      </div>
    </div>
  );
}

export default Loading;
