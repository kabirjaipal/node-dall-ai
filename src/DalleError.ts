export class DalleError extends Error {
  constructor(message: string) {
    super(message);
  }

  send(data: any) {
    console.log(
      `************** ${this.message} ************** \n\n ${data} \n\n************** ${this.message} **************  \n\n`
    );
  }
}
