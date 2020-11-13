export const natsWrapper = {
    //use mockImplementation to make sure he reach for publish event and works well
    client: {
        publish: jest
            .fn()
            .mockImplementation(
                (subject: string, data: string, callback: () => void) => {
                    callback();
                }
            ),
    },
};
