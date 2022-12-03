function FeesFormCard({ title, description, children }) {
  return (
    <div className="bg-base-100 shadow-lg px-8 py-5 rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6">{title}</h3>
          <p className="mt-1 text-sm text-base-content/80">{description}</p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesFormCard;
