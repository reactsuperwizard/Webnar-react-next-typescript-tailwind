export const AccountForm = () => {
  return <div></div>;
};

/* <StyledDisclosureWrapper
              css={[opened === "account" ? tw`p-6` : tw`p-4`]}
            >
              <div
                tw="w-full flex justify-between items-center cursor-pointer"
                onClick={() => setOpened("account")}
              >
                <>
                  <div>
                    <div
                      tw="text-left font-bold text-lg leading-[23.4px]"
                      css={[
                        opened === "account"
                          ? tw`text-csp_neutral-DarkBG`
                          : tw`text-csp_neutral-contrast1`,
                      ]}
                    >
                      Your Account
                    </div>
                    {opened === "account" && (
                      <p tw="font-medium text-xs leading-[150%] text-csp_neutral-contrast1 text-left py-2">
                        Please login or create an account
                      </p>
                    )}
                  </div>

                  {opened !== "account" && (
                    <div tw="text-brand text-xs">Edit</div>
                  )}
                </>
              </div>
              <Transition
                show={opened === "account"}
                {...transitionProps}
              >
                <div tw="flex pt-4 items-end justify-between">
                  <div tw="flex flex-col gap-y-4 flex-grow">
                    <SocialButton
                      variant="outline"
                      type="facebook"
                      isColorIcon
                    />
                    <SocialButton variant="outline" type="google" isColorIcon />
                  </div>
                  <div tw="flex flex-col justify-between items-center max-w-[15px] px-4">
                    <span tw="w-[1px] h-8 bg-brand-100" />
                    <span tw="italic text-csp_neutral-contrast text-sm leading-[150%] font-bold">
                      OR
                    </span>
                    <span tw="w-[1px] h-8 bg-brand-100" />
                  </div>
                  <div tw="flex flex-col gap-y-4 flex-grow">
                    <CustomInput label="Email Address" />
                    <Button
                      variant="primary"
                      color="brand"
                      title="Continue with email"
                      icon={<ArrowCircleRightIcon tw="w-4 h-4" />}
                    />
                  </div>
                </div>
              </Transition>
            </StyledDisclosureWrapper> */
