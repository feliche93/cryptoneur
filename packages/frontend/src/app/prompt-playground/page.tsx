const PromptPlayground = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Title */}
        <div>
          <h1 className="text-2xl tracking-tight sm:text-3xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold  text-transparent">
              Enhanced
            </span>{' '}
            Open AI Playground
          </h1>
        </div>
        <div className="grid w-full grid-cols-4">
          <div className="col-span-2">
            <div className="flex flex-row">
              <div className="form-control w-full pt-8">
                <label className="label">
                  <span className="label-text">Open AI API Key</span>
                </label>
                <div className="flex flex-row space-x-2">
                  <input
                    type="password"
                    placeholder="Fill in your openAI API key"
                    className="input-bordered input w-full "
                  />
                  <button className="btn-primary btn">Validate</button>
                </div>
                <label className="label">
                  <span className="label-text-alt">
                    Don't Worry we will not store or leak your key.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PromptPlayground
