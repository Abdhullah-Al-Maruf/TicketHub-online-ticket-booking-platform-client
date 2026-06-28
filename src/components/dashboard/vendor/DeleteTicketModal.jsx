"use client";


import { deleteTicket } from "@/lib/action/tickets";
import { Button, Modal } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteTicketModal = ({ isDeleteOpen, setIsDeleteOpen, id }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteTicket = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteTicket(id);
            
            // Check based on your api structure response formatting
            if (res) {
                toast.success("Ticket deleted successfully");
                setIsDeleteOpen(false); // Closes modal
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete ticket");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-md mx-auto">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-white font-bold text-lg">Delete Ticket Listing</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="py-2">
                            <p className="text-slate-300 text-sm">
                                Are you sure you want to delete this ticket? This will permanently remove the listing and cannot be undone.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="flex justify-end gap-3 pt-4">
                            <Button 
                                variant="light" 
                                className="text-slate-400" 
                                onPress={() => setIsDeleteOpen(false)}
                                isDisabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button 
                                color="danger" 
                                className="font-bold" 
                                onPress={handleDeleteTicket}
                                isLoading={isDeleting}
                            >
                                Delete Ticket
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteTicketModal;